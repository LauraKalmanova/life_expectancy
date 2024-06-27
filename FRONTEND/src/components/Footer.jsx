import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground py-4 px-6 mt-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <nav className="hidden md:flex space-x-4">
          <Link to="/about" className="hover:text-primary-foreground/80">
            À propos
          </Link>
        </nav>
        <div>
          <p>&copy; 2024 Espérance de vie en France. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
