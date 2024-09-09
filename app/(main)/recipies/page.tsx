import { mockData } from "@/data/mockdata";

export default function Page() {
  return (
    <div>
      <h1>Recipies</h1>
      <p>{mockData.recipes}</p> {/* モックデータを表示 */}
    </div>
  );
}
