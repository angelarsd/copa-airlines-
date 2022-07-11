import axios from "axios";

interface HomeProps {
  data?: {
    bestPrice: number;
    inboundResults: {
      date: string;
      outboundResults: {
        date: string;
        isLowestPrice: boolean;
        originalPrice: number;
        price: number;
      }[];
    }[];
  };
  error: boolean;
}

const Home = ({ error, data }: HomeProps): JSX.Element => {
  if (data && !error) {
    return (
      <table border={1} style={{ marginLeft: "auto", marginRight: "auto" }}>
        {data?.inboundResults.map((item, i) => {
          if (i === 0) {
            return (
              <>
                <thead key={i}>
                  {item.outboundResults.map((outbound, j) => {
                    if (j === 0) {
                      return (
                        <>
                          <th />
                          <th key={j}>{outbound.date}</th>
                        </>
                      );
                    }
                    return <th key={j}>{outbound.date}</th>;
                  })}
                </thead>
                <tr key={i}>
                  {item.outboundResults.map((outbound, j) => {
                    const price =
                      outbound.price !== data.bestPrice ? (
                        outbound.price
                      ) : (
                        <b>{outbound.price}</b>
                      );
                    if (j === 0) {
                      return (
                        <>
                          <th key={j}>{item.date}</th>
                          <td align="center" key={j}>{price}</td>
                        </>
                      );
                    }
                    return <td align="center" key={j}>{price}</td>;
                  })}
                </tr>
              </>
            );
          }

          return (
            <tr key={i}>
              {item.outboundResults.map((outbound, j) => {
                const price =
                  outbound.price !== data.bestPrice ? (
                    outbound.price
                  ) : (
                    <b>{outbound.price}</b>
                  );
                if (j === 0) {
                  return (
                    <>
                      <th key={j}>{item.date}</th>
                      <td align="center" key={j}>{price}</td>
                    </>
                  );
                }
                return <td align="center" key={j}>{price}</td>;
              })}
            </tr>
          );
        })}
      </table>
    );
  }

  return <>ErrorState</>;
};

export async function getServerSideProps() {
  const { status, data } = await axios.get(
    `https://copa-airlines-api.vercel.app/`
  );

  if (status === 200 && data) {
    return { props: { data, error: false } };
  } else {
    return { props: { error: true } };
  }
}

export default Home;
