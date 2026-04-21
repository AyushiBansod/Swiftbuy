import React, { useState } from "react";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  AppBar,
  Toolbar,
  Switch,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Pagination,
  TextField,
  MenuItem,
} from "@mui/material";
import { Email, Phone, LocationOn, CreditCard } from "@mui/icons-material";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState(
    "Boss, keep pushing—every step counts! 📈"
  );
  const [filter, setFilter] = useState("All products");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const messages = [
    "Boss, keep pushing—every step counts! 📈",
    "Success is the sum of small efforts repeated daily. 💪",
    "You’re one step closer to your goals! 🚀",
  ];

  // Sample orders data
  const orders = [
    {
      id: "#35463",
      date: "Aug 17, 2020, 5:48 (ET)",
      customer: "Jase Marley",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
      paymentMethod: "•••• 4242",
      products: [
        {
          image: "https://via.placeholder.com/80",
          description: "Topman shoe in green",
          gender: "Women",
          color: "Green",
          size: "UK 7",
          price: 21.0,
          quantity: 2,
          total: 42.0,
        },
      ],
      subtotal: 65.0,
      shippingFee: 0.0,
      tax: 7.0,
      total: 65.0,
      amountPaid: 65.0,
      shippingActivity: [
        { status: "Delivered", time: "4:17 AM" },
        { status: "Out for delivery", time: "2:38 AM" },
      ],
      trackingNumber: "3981241023109293",
      customerDetails: {
        name: "Jase Marley",
        email: "jase@site.com",
        phone: "+1 (609) 972-22-22",
        shippingAddress: "45 Roker Terrace, Latheronwheel, KW5 8NW, London, UK",
        billingAddress: "45 Roker Terrace, Latheronwheel, KW5 8NW, London, UK",
        paymentMethod: "Mastercard",
        cardNumber: "**** **** **** 4242",
      },
    },
    // Add more orders here...
  ];

  const itemsPerPage = 10;
  const filteredOrders = orders
    .filter((order) => {
      if (filter === "Unfulfilled")
        return order.fulfillmentStatus === "Unfulfilled";
      if (filter === "Unpaid") return order.paymentStatus === "Pending";
      return true;
    })
    .filter((order) =>
      order.customer.toLowerCase().includes(search.toLowerCase())
    );

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Create a Material-UI theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {/* Header with Motivational Message and Date/Time */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {message}
            </Typography>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              {new Date().toLocaleString()}
            </Typography>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </Toolbar>
        </AppBar>

        <Divider sx={{ marginBottom: 3 }} />
        {/* Analytics Section */}
        <Grid
          container
          spacing={3}
          sx={{ marginBottom: 3, display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Analytics
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {/* Sales Trends - Wider Chart */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardHeader title="Sales Trends" />
                  <CardContent>
                    <Line
                      data={{
                        labels: ["18/03/2025", "19/03/2025", "20/03/2025"],
                        datasets: [
                          {
                            label: "Revenue",
                            data: [500, 700, 900],
                            borderColor: "#007bff",
                            backgroundColor: "rgba(0, 123, 255, 0.2)",
                            tension: 0.4,
                          },
                        ],
                      }}
                      options={{ maintainAspectRatio: false }}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Revenue Breakdown - Bigger Pie Chart */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardHeader title="Revenue Breakdown" />
                  <CardContent>
                    <Pie
                      data={{
                        labels: ["T-Shirt", "Jeans", "Shoes"],
                        datasets: [
                          {
                            data: [60, 40, 30],
                            backgroundColor: ["#ff6f61", "#ffcc29", "#36a2eb"],
                          },
                        ],
                      }}
                      options={{ maintainAspectRatio: false }}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Centered Section - Top-Selling & Order Status */}
              <Grid item xs={12} container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader title="Top-Selling Products" />
                    <CardContent>
                      <Bar
                        data={{
                          labels: ["T-Shirt", "Jeans", "Shoes"],
                          datasets: [
                            {
                              label: "Quantity Sold",
                              data: [20, 10, 15],
                              backgroundColor: [
                                "#28a745",
                                "#ffcc29",
                                "#007bff",
                              ],
                            },
                          ],
                        }}
                        options={{ maintainAspectRatio: false, indexAxis: "y" }}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader title="Daily Orders Trend" />
                    <CardContent>
                      <Line
                        data={{
                          labels: ["18/03/2025", "19/03/2025", "20/03/2025"],
                          datasets: [
                            {
                              label: "Orders Placed",
                              data: [25, 40, 35],
                              borderColor: "#ff5733",
                              backgroundColor: "rgba(255, 87, 51, 0.2)",
                              tension: 0.4,
                            },
                          ],
                        }}
                        options={{ maintainAspectRatio: false }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Orders List or Order Details */}
        {selectedOrder ? (
          // Order Details View
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order #{selectedOrder.id}
                  </Typography>
                  <List>
                    {selectedOrder.products.map((product, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar
                            src={product.image}
                            alt={product.description}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={product.description}
                          secondary={
                            <>
                              <Typography variant="body2">
                                Gender: {product.gender}
                              </Typography>
                              <Typography variant="body2">
                                Color: {product.color}
                              </Typography>
                              <Typography variant="body2">
                                Size: {product.size}
                              </Typography>
                              <Typography variant="body2">
                                ${product.price} x {product.quantity} = $
                                {product.total}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ marginY: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2">Subtotal:</Typography>
                      <Typography variant="body2">Shipping fee:</Typography>
                      <Typography variant="body2">Tax:</Typography>
                      <Typography variant="body2">Total:</Typography>
                      <Typography variant="body2">Amount paid:</Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                      <Typography variant="body2">
                        ${selectedOrder.subtotal}
                      </Typography>
                      <Typography variant="body2">
                        ${selectedOrder.shippingFee}
                      </Typography>
                      <Typography variant="body2">
                        ${selectedOrder.tax}
                      </Typography>
                      <Typography variant="body2">
                        ${selectedOrder.total}
                      </Typography>
                      <Typography variant="body2">
                        ${selectedOrder.amountPaid}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Shipping Activity */}
              <Card sx={{ marginTop: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Shipping Activity
                  </Typography>
                  <List>
                    {selectedOrder.shippingActivity.map((activity, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={activity.status}
                          secondary={activity.time}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Tracking number: {selectedOrder.trackingNumber}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Customer Information */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Customer
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    {selectedOrder.customerDetails.name}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    <Email fontSize="small" sx={{ marginRight: 1 }} />
                    {selectedOrder.customerDetails.email}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    <Phone fontSize="small" sx={{ marginRight: 1 }} />
                    {selectedOrder.customerDetails.phone}
                  </Typography>
                  <Divider sx={{ marginY: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Shipping Address
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    <LocationOn fontSize="small" sx={{ marginRight: 1 }} />
                    {selectedOrder.customerDetails.shippingAddress}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Billing Address
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    <LocationOn fontSize="small" sx={{ marginRight: 1 }} />
                    {selectedOrder.customerDetails.billingAddress}
                  </Typography>
                  <Divider sx={{ marginY: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Payment Method
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    <CreditCard fontSize="small" sx={{ marginRight: 1 }} />
                    {selectedOrder.customerDetails.paymentMethod}{" "}
                    {selectedOrder.customerDetails.cardNumber}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          // Orders List View
          <Card>
            <CardContent>
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    fullWidth
                    label="Filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <MenuItem value="All products">All products</MenuItem>
                    <MenuItem value="Unfulfilled">Unfulfilled</MenuItem>
                    <MenuItem value="Unpaid">Unpaid</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Search users"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Grid>
              </Grid>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Payment Status</TableCell>
                      <TableCell>Fulfillment Status</TableCell>
                      <TableCell>Payment Method</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.paymentStatus}</TableCell>
                        <TableCell>{order.fulfillmentStatus}</TableCell>
                        <TableCell>{order.paymentMethod}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleViewOrder(order)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Pagination
                count={Math.ceil(filteredOrders.length / itemsPerPage)}
                page={page}
                onChange={(e, value) => setPage(value)}
                sx={{ marginTop: 2 }}
              />
            </CardContent>
          </Card>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
