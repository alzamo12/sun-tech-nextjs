import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

 async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }
  return (
    <div className="">
      {/* Content */}
      <div className="flex-1 p-6 ">{children}</div>
    </div>
  );

};
export default DashboardLayout
