import MainLayout from "../layouts/MainLayout/MainLayout";
import HeroArea from "../views/Home/HeroArea/HeroArea";
import StakingArea from "../views/Home/StakingArea/StakingArea";
import WhyUsArea from "../views/Home/WhyUsArea/WhyUsArea";
import WorkProcessArea from "../views/Home/WorkProcessArea/WorkProcessArea";
import PixbyGames from "../views/common/PixbyGames/PixbyGames";
import Call2ActionArea from "../views/Home/Call2ActionArea/Call2ActionArea";
import StakingHistoryArea from "../views/Home/StakingHistoryArea/StakingHistoryArea";
import WalletIcons from "../views/Home/AppsArea/WalletIcons";
import ExchangeIcons from "../views/Home/AppsArea/ExchangeIcons";

const Home = () => {
  return (
    <MainLayout>
      <HeroArea />
      <StakingArea />
      <WhyUsArea />
      <WorkProcessArea />
      <PixbyGames />
      <StakingHistoryArea />
      <Call2ActionArea />
    </MainLayout>
  );
};

Home.propTypes = {};

export default Home;
