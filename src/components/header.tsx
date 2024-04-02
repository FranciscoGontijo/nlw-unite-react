import nlwUniteIcon from "../assets/nlw-unite-icon.svg"

export const Header = () => {
  return (
    <div className="flex items-center gap-5">
      <img src={nlwUniteIcon} />
      
      <nav className="flex gap-5">
        <a className="font-medium text-sm text-zinc-300">Eventos</a>
        <a className="font-medium text-sm">Participantes</a>
      </nav>
    </div>
  )
};