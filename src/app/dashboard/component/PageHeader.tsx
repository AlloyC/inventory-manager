// import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";

const PageHeader = ({
  title,
  buttonOneText,
  buttonTwoText,
  solidOne,
  solidTwo,
  buttonPropOne,
  buttonPropTwo,
}: {
  title: string;
  buttonOneText?: string;
  buttonTwoText?: string;
  solidOne?: boolean;
  solidTwo?: boolean;
  buttonPropOne?: React.ComponentProps<typeof Button>;
  buttonPropTwo?: React.ComponentProps<typeof Button>;
}) => {
  return (
    <header className={`flex items-center justify-between`}>
      <PageTitle title={title} />
      <div className="flex gap-4">
        {buttonOneText && (
          <Button
            {...buttonPropOne}
            className={`hidden shadow md:flex font-medium ${solidOne && "bg-blue-700 text-white"}`}
          >
            {buttonOneText}
          </Button>
        )}
        {buttonTwoText && (
          <Button
            {...buttonPropTwo}
            className={`${solidTwo && "bg-blue-700 hover:bg-blue-800 text-white font-medium"} shadow font-medium`}
          >
            {buttonTwoText}
          </Button>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
