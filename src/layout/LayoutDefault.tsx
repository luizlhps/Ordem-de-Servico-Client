import { SideMenu } from "../components/index";
import { useRouter } from "next/router";

export default function HeaderBlack({ children }: any) {
  const router = useRouter();

  return <SideMenu>{children}</SideMenu>;
}
