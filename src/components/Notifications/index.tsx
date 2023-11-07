import { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { fetchData } from "@services/api";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { INotification } from "@/services/interfaces/common";
const theme = createTheme();

export default function Notifications({ closeDrawer }: any) {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  useEffect(() => {
    fetchData("website/notifications").then((res) => {
      setNotifications(res.data.notifications);
    });
  }, []);
  if (!notifications) {
    return <div>Loading...</div>;
  }
  if (notifications.length == 0) {
    return <div>No notifications</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="mx-auto px-4">
          <div className="mt-6 flex-row justify-between">
            <div className=" flex justify-between">
              <p className="font-bold text-lg md:text-2xl">Notifications</p>
              <CloseIcon onClick={closeDrawer} />
            </div>
          </div>
        </div>
      </div>
      <main>
        <div
          style={{
            margin: "0px",
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* End hero unit */}
          <Grid container spacing={2}>
            {notifications?.map((notification) => (
              <Grid item key={notification.title} xs={12} sm={4} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia component="img" image={notification.image.url} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>
                      <p
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {notification.title}
                      </p>
                    </Typography>
                  </CardContent>
                  <Link href={notification.action.url} target="_blank">
                    <button
                      style={{
                        border: "1px solid #4169E0",
                        color: "white",
                        backgroundColor: "#4169E0",
                        borderRadius: "5px",
                        margin: "10px",
                        padding: "5px",
                        marginTop: "0px",
                        width: "95%",
                      }}
                    >
                      {notification.action.label}
                    </button>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </main>
    </ThemeProvider>
  );
}
