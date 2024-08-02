export const animateOptions = {
    itemVariants: {
        transition: { ease: "easeOut", duration: 0.3 },
        variants: {
            open: {
                backgroundColor: "#640000",
            },
            closed: {
                backgroundColor: "white",
            }
        },
    },
    contentVariants: {
        transition: { ease: "easeOut", duration: 0.3 },
        variants: {
            open: {
                height: "auto",
                padding: "0px 20px",
            },
            closed: {
                height: 0,
                padding: "0px 20px",
                overflow: "hidden",
            },
        }
    }
}

