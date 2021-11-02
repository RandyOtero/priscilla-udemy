import Image from'next/image';
import Button from "../../components/ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRight from "../icons/arrow-right-icon";
import classes from "./event-item.module.css";

function EventItem(props) {
  const { title, image, date, location, id } = props;
  const updatedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const address = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;
  return (
    <li className={classes.item}>
       <Image src={"/" + image} alt={title} width={340} height={160}/>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{updatedDate}</time>
          </div>
          <div>
            <address className={classes.address}>
              <AddressIcon />
              {address}
            </address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRight/>
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
