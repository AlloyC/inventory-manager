
function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-linear-to-br from-blue-400 to-purple-600">
      {children}
    </div>
  )
}

export default layout
