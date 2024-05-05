const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full flex items-center justify-center py-10">
            {children}
        </div>
    )
}

export default AuthLayout;