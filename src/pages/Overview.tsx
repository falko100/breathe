import { IonContent, IonPage } from "@ionic/react";
import { sounds } from "../api/sounds.mjs";
import { Link } from "react-router-dom";

const Page: React.FC = () => {
  return (
    <IonPage className="pt-2 ios:pt-12 android:pt-2 bg-gradient-to-br from-cyan-200 from-10% via-sky-200 via-30% to-white">
      <IonContent fullscreen>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8 px-4">
          {sounds.map((sound) => (
            <div
              key={sound.slug}
              className="card bg-white rounded-lg shadow-lg"
            >
              <Link className="block" to={"/sound/" + sound.slug}>
                <figure className="p-4">
                  <img
                    loading="lazy"
                    src={sound.image}
                    className="object-cover object-center aspect-1 aspect-1 w-full rounded-lg shadow-lg"
                    alt=""
                  />
                </figure>
              </Link>
              <div className="px-4 pb-4">
                <h3 className="text-lg font-medium text-gray-900">
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
