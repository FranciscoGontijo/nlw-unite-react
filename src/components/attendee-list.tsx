import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/pt-br';
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table.row";
import { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

interface Attendee {
    id: string;
    name: string;
    email: string;
    checkedInAt: string;
    createdAt: string | null;
}

export const AttendeeList = () => {
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const url = new URL("http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees");

        url.searchParams.set('pageIndex', String(page - 1));

        if (searchInputValue.length > 0) {
            url.searchParams.set('query', searchInputValue);
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAttendees(data.attendees);
                setTotal(data.total);
            });
    }, [page, searchInputValue]);

    const onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(event.target.value);
        setPage(1);
    };

    const returnPage = () => {
        if (page > 1) {
            setPage(currentPage => currentPage - 1)
        }
        return
    };

    const nextPage = () => {
        if (page < total / 10) {
            setPage(currentPage => currentPage + 1)
        }
        return
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center ">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input
                        onChange={onSearchInputChange}
                        className="bg-transparent flex-1 text-sm border-0 p-0 focus:ring-0"
                        placeholder="Buscar participante..." />
                </div>
            </div>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader style={{ width: 48 }}>
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participantes</TableHeader>
                        <TableHeader>Data da inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <TableHeader style={{ width: 64 }}></TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {attendees.map((attendee) => {
                        return (
                            <TableRow key={attendee.id} className="hover:bg-white/5">
                                <TableCell>
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{dayjs(attendee.createdAt).fromNow()}</TableCell>
                                <TableCell>{attendee.checkedInAt
                                    ? dayjs(attendee.checkedInAt).fromNow()
                                    : <span className="text-zinc-400">Não fez check-in</span>}</TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>Mostrando {attendees.length} de {total}</TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>Página {page} de {Math.ceil(total / 10)}</span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={() => setPage(1)} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={returnPage} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={nextPage} disabled={page === Math.ceil(total / 10)}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={() => setPage(Math.ceil(total / 10))} disabled={page === Math.ceil(total / 10)}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
};
