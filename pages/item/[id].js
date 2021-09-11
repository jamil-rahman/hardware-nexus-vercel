import Head from "next/head";
import { useState, useContext, React } from "react";
import { DataContext } from "../../store/GlobalState";
import { getData } from "../../utils/fetchData";
import {
  capitalize_first_letter,
  addComma,
  to_capital_case,
} from "../../utils/toCapitalCase";
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


const labels = {
  0.5: 'Scam',
  1: 'Very suspicious',
  1.5: 'Looks Defected',
  2: 'Not Worth',
  2.5: 'Okay',
  3: 'Solid',
  3.5: 'Good Hardware',
  4: 'Reasonable Pricing',
  4.5: 'Great Deal',
  5: 'Excellent Deal',
};

 //ratings styles
 const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    color: 'black'
  },
  '& .MuiRating-value': {
    background: 'black',
    fontFamily: "'Kameron', serif"
  }
});


const DetailedProduct = (props) => {
  const [item] = useState(props.item);
  const [tab, setTab] = useState(0);


  //Ratings useStates
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const classes = useStyles();


 

  const { dispatch } = useContext(DataContext);

  const handleReport =()=>{
    dispatch({ type: "NOTIFY", payload: { warning: "Report has beeen sent to the Admin. You will be notified later about the decision taken." } });
  }

  const isActive = (index) => {
    if (tab === index) return "active";
    return;
  };
  return (
    <div >
      <div className="row detail_page">
        <Head>
          <title>Hardware Details</title>
        </Head>

        {/* Displaying my images of products */}

        <div className="col-md-6">
          <img
            src={item.images[tab].url}
            alt={item.images[tab].url}
            className="d-block img-thumbnail rounded mt-4 w-100"
            style={{ height: "350px" }}
          />

          <div className="row mx-0" style={{ cursor: "pointer" }}>
            {item.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.url}
                className={`img-thumbnail rounded ${isActive(index)}`}
                style={{ height: "80px", width: "20%" }}
                onClick={() => setTab(index)}
              />
            ))}
          </div>

        
        </div>

        <div className="col-md-6 mt-3">
          <div className="row mx-0 d-flex justify-content-between">
          <h2
            className="text-uppercase"
            style={{ fontFamily: "Advent Pro", color: "black" }}
          >
            {item.title}
          </h2>

              {/* button for report */}
          <button type="button" class="btn btn-danger" onClick={handleReport}><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Report Ad</button>

          </div>

          <div className="row mx-0 d-flex justify-content-between">
            <div>
              <label className="text-info" style={{ color: "black" }}>
                <strong>Price</strong>
              </label>
              <h5
                className="text-success"
                style={{ fontSize: "4rem", fontWeight: "500" }}
              >
                ৳{" "}
                <span style={{ fontFamily: "'Kameron', serif" }}>
                  {addComma(item.price)}{" "}
                </span>
              </h5>
            </div>
           
          </div>
         

          <div className="description my-2">
            <label
              className="text-warning"
              style={{ fontFamily: "'Kaemron', serif" }}
            >
              <strong>ITEM DESCRIPTION</strong>
            </label>
            <div
              className="my-1"
              style={{
                color: "black",
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              {capitalize_first_letter(item.description)}
            </div>
          </div>

          {/* add contact info of user if given */}
          <div className="contact-info my-4">
            {item.contact_number ? (
              <span className="text-black">
                <strong>Contact Number:</strong> 0{item.contact_number}
              </span>
            ) : (
              <span className="text-danger">Contact info is not given</span>
            )}
          </div>

          <div className="location-detail my-4">
            {item.location ? (
              <span style={{ color: "#4267B2", fontWeight: "600" }}>
                <strong>Location:</strong> {to_capital_case(item.location)}
              </span>
            ) : (
              <span className="text-danger">Location is not provided</span>
            )}
          </div>
        </div>
      </div>

      {/* ratings component */}
              <div className="row mx-auto">
                <div className={classes.root}>
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  />
                  {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                </div>
              </div>
      
          
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`item/${id}`);
  // console.log(res);
  return {
    props: {
      item: res.item,
    }, //will be passed to the page component as props
  };
}

export default DetailedProduct;
