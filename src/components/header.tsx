import nlwUniteIcon from "../assets/nlw-unite-icon.svg"
import { NavLink } from "./navlink";
export const Header = () => {
  return (
    <div className="flex items-center gap-5">
      <img src={nlwUniteIcon} />
      
      <nav className="flex gap-5">
        <NavLink href="/eventos">Eventos</NavLink>
        <NavLink href="/participante">Participantes</NavLink>
      </nav>
    </div>
  )
};