import { Profile } from "@/components/scene/Profile";
import { Carrier } from "@/components/scene/Carrier";
import { grantsAwards, soloExhibitions } from "@/public/carrierContents";
import { SceneManager } from "@/components/SceneManager";
import Layout from "../../components/Layout";
export default function Home({ params }: { params: { locale: string } }) {
  return (
    <>
      <Layout>
        <SceneManager
          scenes={[
            <Profile key="scene-profile" />,
            <Carrier
              key="scene-awards"
              items={grantsAwards}
              title="Grants and Awards"
            />,
            <Carrier
              key="scene-exhibitions"
              items={soloExhibitions}
              title="Solo Exhibitions"
            />,
          ]}
          languageMode={"ja"}
        />
      </Layout>
    </>
  );
}
