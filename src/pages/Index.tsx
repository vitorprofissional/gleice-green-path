import GreenCardLanding from "@/components/GreenCardLanding";
import WebhookTest from "@/components/WebhookTest";

const Index = () => {
  return (
    <div>
      <GreenCardLanding />
      <div className="py-8 px-4">
        <WebhookTest />
      </div>
    </div>
  );
};

export default Index;
