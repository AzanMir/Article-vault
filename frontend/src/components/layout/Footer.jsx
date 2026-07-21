export default function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} Article Vault. All rights reserved.
      </div>
    </footer>
  );
}