import './AppFeatures.scss';
import "bootstrap-icons/font/bootstrap-icons.css";

import HotTubIcon from '@mui/icons-material/HotTub';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActiveOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import UpdateIcon from '@mui/icons-material/Update';

// import "bootstrap/dist/css/bootstrap.min.css";

function AppFeatures() {
  return (
    <section id="featured-services" className={"featured-services section"}>

      <div className={"container"}>
        {/* <h3 data-aos="fade-up" className={"ps- py-3"}>Features</h3> */}

        <div className={"row gy-4"}>

          <div className={"col-xl-3 col-md-6 d-flex"} data-aos="fade-up" data-aos-delay="100">
            <div className={"service-item position-relative"}>
              <div className={"icon"}>
                {/* <i className={"bi bi-activity icon"}></i> */}
                <HotTubIcon sx={{ fontSize: 48 }} />
              </div>
              <h4><a className={"stretched-link"}>Waiting is joyful</a></h4>
              <p>Make it easy to pick a service you want and hanlde your productivity effectively.</p>
            </div>
          </div>

          <div className={"col-xl-3 col-md-6 d-flex"} data-aos="fade-up" data-aos-delay="200">
            <div className={"service-item position-relative"}>
            <div className={'icon'}>
                {/* <i className={"bi bi-phone-vibrate icon"}></i> */}
                <AppShortcutIcon sx={{ fontSize: 48 }} />
              </div>
              <h4><a className={"stretched-link"}>Multiple Notification Channels</a></h4>
              <p>Real-time updates and notifications though Web notification, SMS and email</p>
              <div className={'d-flex justify-content-between mx-3 p-4'}>
                <MarkUnreadChatAltIcon fontSize={'medium'} />
                <MarkEmailUnreadOutlinedIcon fontSize={'medium'} />
                <NotificationsActiveIcon fontSize={'medium'} />
              </div>
            </div>
          </div>

          <div className={"col-xl-3 col-md-6 d-flex"} data-aos="fade-up" data-aos-delay="300">
            <div className={"service-item position-relative"}>
              <div className={"icon"}>
                {/* <i className={"bi bi-calendar4-week icon"}></i> */}
                <CalendarMonthIcon sx={{ fontSize: 48 }} />
              </div>
              <h4><a className={"stretched-link"}>Queue Monitor & Management</a></h4>
              <p>Give customers more reasons to satisfy when coming to your service by freely lining up with real-time update</p>
              <div className={'d-flex justify-content-evenly mx-3 p-4'}>
                <UpdateIcon fontSize={'medium'} />
                {/* <TimelineIcon fontSize={'medium'} /> */}
              </div>
            </div>
            
          </div>

          <div className={"col-xl-3 col-md-6 d-flex"} data-aos="fade-up" data-aos-delay="400">
            <div className={"service-item position-relative"}>
              <div className={"icon"}>
                {/* <i className={"bi bi-graph-up icon"}></i> */}
                <AutoGraphIcon sx={{ fontSize: 48 }} />
              </div>
              <h4><a className="stretched-link">Analytics and insights</a></h4>
              <p>Collect data insights to see how your bussiness is running and spot improvement oppotunities.</p>
              <div className={'d-flex justify-content-between mx-3 p-4'}>
                <BarChartIcon fontSize={'medium'} />
                <TimelineIcon fontSize={'medium'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppFeatures;