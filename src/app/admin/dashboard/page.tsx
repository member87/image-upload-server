import { getImagesByCursor } from "@/app/actions";
import ImageContainer from "@/components/admin/imageContainer";


export default async function Dashboard() {

  const res = await getImagesByCursor(0)
  return (
    <main className="h-screen p-4">
      <ImageContainer images={res.data} lastPage={res.page.lastPage == res.page.currentPage} />
    </main>
  );
}
