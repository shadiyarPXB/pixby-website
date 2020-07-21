import { action, thunk } from "easy-peasy";
import axios from "axios";

export default {
  data: {},
  loading: true,
  error: null,
  fetchMarketData: thunk(async (actions) => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/pixby?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true"
      );
      // console.dir(data);
      actions.setMarketData({
        currentPrice: {
          usd: data.market_data.current_price.usd,
          priceChange: data.market_data.price_change_24h,
        },
        totalVolume: {
          usd: data.market_data.total_volume.usd,
          btc: data.market_data.total_volume.btc,
        },

        marketCap: {
          circulating: data.market_data.circulating_supply,
          totalSupply: data.market_data.total_supply,
        },
      });
    } catch (error) {
      console.log(error);
      actions.setError(error);
    }
  }),
  setMarketData: action((state, marketData) => {
    state.data = marketData;
    state.loading = false;
  }),
  setError: action((state, error) => {
    state.error = error;
    state.loading = false;
  }),
};
