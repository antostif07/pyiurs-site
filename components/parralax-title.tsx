import {motion} from "framer-motion";

export const ParallaxHeader = ({ title }: {title: string}) => {
    return (
        <div
            className="relative bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold pt-48 pb-24"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596609548164-aee7658cb54f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <motion.h1
                className="relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {title}
            </motion.h1>
        </div>
    );
};