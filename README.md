TypeError: Cannot read properties of undefined (reading 'map')
src\pages\customer\[customerId].tsx (104:24) @ map

  102 | //Config EquipmentField
  103 | const ordersFormattedForDataGrid = useMemo(() => {
> 104 |   return data?.orders.map((obj: any) => {
      |                      ^
  105 |     const values: any[] = [];
  106 |     if (obj.equipment) values.push(obj.equipment);
  107 |     if (obj.brand && !values.includes(obj.brand)) values.push(obj.brand);

  erro na pagina de criar um nova ordem de serviço pelo customerId
    adcionar REDUX EVITAR CHAMADAS do users, customers em outros lugares de modo extra dimunuindo o consumo da api