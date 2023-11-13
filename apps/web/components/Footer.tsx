const Footer = () => {
    return (
        <footer className="bg-black text-white p-4">
            <div className="container mx-auto flex flex-col items-center justify-center h-full mb-8">
                <p className="text-sm">Requests are limited to 10 every 4 hours </p><p className="text-sm">&copy; {new Date().getFullYear()} GPTAssemblage. All rights reserved.</p>
            </div>
        </footer>

    );
};

export default Footer;
