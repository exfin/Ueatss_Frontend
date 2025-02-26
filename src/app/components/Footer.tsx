function Footer() {
    return (
        <footer className="bg-[hsl(240,45%,9%)] w-full h-[125px] flex items-center mb-0">
            <p className="text-[rgb(251,232,209)] ml-[34px]">
                &copy; {new Date().getFullYear()} - EIA todos los derechos reservados
            </p>
        </footer>
    );
}

export default Footer;
