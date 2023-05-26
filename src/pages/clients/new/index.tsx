import { FormRegisterCostumerProvider } from "@/contexts";

import NewCostumer from "@/components/CostumerPage/NewCostumer";

export default function Home() {
  return (
    <FormRegisterCostumerProvider>
      <>
        <NewCostumer />
      </>
    </FormRegisterCostumerProvider>
  );
}
