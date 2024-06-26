import { getImagesByCursor } from "@/app/actions";
import { logger } from "@/app/utils/logger";
import ImageContainer from "@/components/admin/imageContainer";

export const dynamic = 'force-dynamic'

export default async function Dashboard() {

  const res = await getImagesByCursor(0)
  logger.info(res)
  return (
    <main className="h-screen p-4">
      <ImageContainer images={res.data} lastPage={res.page.lastPage == res.page.currentPage} />
    </main>
  );
}
