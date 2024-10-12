import ContactForm from "@/components/shared/ContactForm";

const Page = () => {
  return (
    <div className="bg-background p-8 rounded-lg">
      <h1 className="text-[42px] text-center">Contact us</h1>
      <div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Page;
