import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";

 export default async function Home(){
//  {
//   searchParams,
// }: {
//   searchParams: Promise<{ page?: string }>;
// }) {
//   // Await the searchParams promise
//   const resolvedSearchParams = await searchParams;

//   // parse page number safely; defaults to 1 if missing/invalid
//   const pageStr = resolvedSearchParams?.page ?? '1';
//   const pageNum = parseInt(pageStr, 10);
//   const currentPage = Number.isNaN(pageNum) ? 1 : pageNum;

  return (
    // <Pagination
    //   itemCount={100}
    //   pageSize={10}
    //   currentPage={currentPage}
    // />
    <LatestIssues />

  );
}



export const dynamic = 'force-dynamic';
export const revalidate = 0;