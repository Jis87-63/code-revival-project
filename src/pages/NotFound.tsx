import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
        <p className="mb-1 text-lg font-semibold text-foreground">Página não encontrada</p>
        <p className="mb-6 text-sm text-muted-foreground">
          A rota <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{location.pathname}</code> não existe.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          ← Voltar para o Bot
        </button>
      </div>
    </div>
  );
};

export default NotFound;
