export default function Home() {
  return (
    <main className="h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading[1.1]">Member87/image-upload-server</h1>
          <h2 className="text-xl text-neutral-950">Opensource personal image uploader using S3 buckets / next js / postgres</h2>
          <a href="https://github.com/member87/image-upload-server">Github</a>
        </div>
      </div>
    </main>
  );
}
