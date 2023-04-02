import { IonContent, IonPage } from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import { sounds } from "../api/sounds.mjs";

const Page: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const sound = sounds.find((sound) => sound.slug === slug);

  if (sound === undefined) {
    return (
      <IonPage className="pt-20 bg-gradient-to-br from-cyan-200 from-10% via-sky-200 via-30% to-white">
        <IonContent>
          <p>Sound not found</p>
          {sounds.join(",")}
          {slug}
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="pt-10 ios:pt-20 android:pt-10 bg-gradient-to-br from-cyan-200 from-10% via-sky-200 via-30% to-white">
      <IonContent fullscreen>
        <ExploreContainer sound={sound} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
