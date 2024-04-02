import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/pt-br';
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table.row";
import { ChangeEvent, useState } from "react";
import { attendees } from "../data/attendees";

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export const AttendeeList = () => {
    const [searchInputValue, setSearchInputValue] = useState('');
    const [page, setPage] = useState(1);

    const onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(event.target.value);
    };

    const returnPage = () => {
        if (page > 1) {
            setPage(currentPage => currentPage - 1)
        }
        return
    };

    const nextPage = () => {
        if (page < attendees.length / 10) {
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
                    <input onChange={onSearchInputChange} className="bg-transparent flex-1 outline-none text-sm border-0 p-0" placeholder="Buscar participante..." />
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
                    {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
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
                                <TableCell>{dayjs(attendee.checkInAt).fromNow()}</TableCell>
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
                        <TableCell colSpan={3}>Mostrando 10 de 228</TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>Página {page} de {Math.ceil(attendees.length / 10)}</span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={() => setPage(1)} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={returnPage} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={nextPage} disabled={page === Math.ceil(attendees.length / 10)}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={() => setPage(Math.ceil(attendees.length / 10))} disabled={page === Math.ceil(attendees.length / 10)}>
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
