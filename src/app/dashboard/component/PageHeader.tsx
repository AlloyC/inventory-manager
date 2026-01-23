import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";

const PageHeader = ({
  title,
  buttonOneText,
  buttonTwoText,
  solidOne,
  solidTwo,
}: {
  title: string;
  buttonOneText?: string;
  buttonTwoText?: string;
  solidOne?: boolean;
  solidTwo?: boolean;
}) => {
  return (
    <header className={`flex items-center justify-between`}>
      <PageTitle title={title} />
      <div className="flex gap-4">
        {buttonOneText && (
          <Button
            text={buttonOneText}
            className={`hidden shadow md:flex font-medium ${solidOne && "bg-blue-700 text-white"}`}
          />
        )}
        {buttonTwoText && (
          <Button
            text={buttonTwoText}
            className={`${solidTwo && "bg-blue-700 text-white font-medium"} shadow font-medium`}
          />
        )}
      </div>
    </header>
  );
};

export default PageHeader;
