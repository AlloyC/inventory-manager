import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";

const PageHeader = ({
  title,
  buttonOneText,
  buttonTwoText,
}: {
  title: string;
  buttonOneText?: string;
  buttonTwoText?: string;
}) => {
  return (
    <header className="flex items-center justify-between">
      <PageTitle title={title} />
      <div className="flex gap-4">
        {buttonOneText && (
          <Button text={buttonOneText} className={"hidden md:flex"} />
        )}
        {buttonTwoText && <Button text={buttonTwoText} />}
      </div>
    </header>
  );
};

export default PageHeader;
