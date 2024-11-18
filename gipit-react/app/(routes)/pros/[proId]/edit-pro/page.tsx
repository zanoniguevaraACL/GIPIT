async function Page({ params }: { params: { proId: string } }) {
  const { proId } = params;
  const routeToRedirect = `/pros/${proId}`;
  console.log(routeToRedirect);

  return <h2> duplicado de new-candidate pero con algunos cambios </h2>;
}

export default Page;
