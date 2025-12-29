export default function Footer() {
  const d = new Date();
  return (
    <footer className="flex justify-center items-center shadow p-18">
      <p>&copy; {d.getFullYear()} Justin Klitgaard</p>
    </footer>
  );
}
