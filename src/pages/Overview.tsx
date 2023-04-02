import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { sounds } from "../api/sounds.mjs";
import { Link } from "react-router-dom";
import { arrowBack } from "ionicons/icons";

const Page: React.FC = () => {
  return (
    <IonPage className="pt-2 ios:pt-12 android:pt-2 bg-gradient-to-br from-cyan-100 from-10% via-sky-300 via-30% to-white">
      <IonContent fullscreen>
        <div className="font-bold text-center text-2xl mt-8">
          Remember to breathe...
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8 px-4">
          {sounds.map((sound) => (
            <div key={sound.slug} className="card">
              <Link className="block" to={"/sound/" + sound.slug}>
                <figure className="shadow-lg">
                  <img
                    loading="lazy"
                    src={sound.image}
                    className="object-cover object-center aspect-1 aspect-1 w-full rounded-lg shadow-lg"
                    alt=""
                  />
                </figure>
              </Link>
              <div className="mt-2 pl-1">
                <h3 className="text-lg font-bold text-slate-700">
                  <Link to={"/sound/" + sound.slug}>{sound.name}</Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
