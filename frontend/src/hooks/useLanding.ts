

export function useLanding() {

  const scrollToSection = (
    id: string
  ) => {

    const section =
      document.getElementById(id);

    section?.scrollIntoView({
      behavior: "smooth"
    });

  };

  return {
    scrollToSection
  };

}