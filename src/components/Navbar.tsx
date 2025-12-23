export default function Navbar() {
  return (
    <nav className="flex justify-between items-center shadow p-1 md:p-2">
      <h1 className="font-bold text-3xl md:text-4xl">Eiki</h1>
      <ul className="flex gap-1 md:gap-2">
        <li>Login</li>
        <li>About</li>
        <li>EN</li>
      </ul>
    </nav>
  );
}
