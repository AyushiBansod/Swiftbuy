import React, { useState } from "react";
import Swal from "sweetalert2";
import { Visibility } from "@mui/icons-material"; // Add this import
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  Edit,
  Delete,
  Home,
  Inventory,
  ShoppingCart,
  Settings,
} from "@mui/icons-material";
import "../adminPanel.css";

const AdminPanel = ({ products, addProduct, updateProduct, deleteProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    offer: "",
    stockMessage: "",
    stock: 0,
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedSection, setSelectedSection] = useState("home");
  const [isLoading, setIsLoading] = useState(false);

  // Function to calculate stockMessage for products
  const getStockMessage = (product) => {
    if (!product.isInitial) {
      return product.stockMessage || ""; // Return admin-provided message or empty string
    }

    // For initial products, use default stock messages
    if (product.stock === 0) {
      return "Buy 1 Get 1 Free"; // Default message for zero stock
    } else if (product.stock <= 2) {
      return `Hurry up! Only ${product.stock} left`; // Default message for low stock
    } else {
      return ""; // No stock message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.image
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill out all required fields.",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (editingProduct) {
        await updateProduct({
          ...newProduct,
          _id: editingProduct._id,
          isInitial: false, // Ensure the product is no longer treated as initial
        });
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Product updated successfully!",
        });
      } else {
        await addProduct({ ...newProduct, isInitial: false });
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Product added successfully!",
        });
      }

      setNewProduct({
        name: "",
        price: "",
        category: "",
        image: "",
        imageName: "",
        offer: "",
        stockMessage: "",
        stock: 0,
      });
      setEditingProduct(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    // Calculate the stock message for initial products
    const stockMessage = getStockMessage(product);

    // Pre-fill the form with the product data and calculated stock message
    setNewProduct({
      ...product,
      stockMessage: stockMessage, // Pre-fill the stock message
    });

    setEditingProduct(product);
    setSelectedSection("home"); // Switch to the "Home" section
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId); // Call your delete function
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: reader.result, // Store the image as a base64 string
          imageName: file.name, // Store the file name
        });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          zIndex: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            position: "relative",
            height: "100%",
            minHeight: "100vh",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Welcome Ayushi !
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem
            component="div"
            onClick={() => setSelectedSection("home")}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            component="div"
            onClick={() => setSelectedSection("manage-products")}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Manage Products" />
          </ListItem>
          <ListItem
            component="div"
            onClick={() => setSelectedSection("orders")}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem
            component="div"
            onClick={() => setSelectedSection("settings")}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>

        {/* Logout Button */}
        <Box sx={{ p: 2, mt: "auto" }}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => {
              alert("Logged out successfully!");
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "calc(100% - 240px)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Conditional Rendering Based on Selected Section */}
        {selectedSection === "home" && (
          <>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                textAlign: "center",
              }}
            >
              Home
            </Typography>

            {/* Add New Product Form */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                width: "100%",
                maxWidth: "800px",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ mb: 3, fontWeight: "600" }}
              >
                {editingProduct ? "Edit Product" : "Add New Product"}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Product Name"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Price"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Product Image"
                      value={newProduct.imageName || ""}
                      onClick={() =>
                        document.getElementById("imageUpload").click()
                      }
                      required
                      variant="outlined"
                      InputProps={{
                        readOnly: true, // Prevents manual input
                        endAdornment: newProduct.image && ( // Show eye icon only if an image is selected
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent opening the file picker
                              Swal.fire({
                                title: "Image Preview",
                                imageUrl: newProduct.image, // Show the base64 image
                                imageAlt: "Product Image",
                                imageWidth: "80%", // Set maximum width for the image
                                imageHeight: "auto", // Maintain aspect ratio
                                showConfirmButton: false,
                                showCloseButton: true,
                                customClass: {
                                  popup: "custom-swal-popup", // Add custom class for the modal
                                  closeButton: "custom-swal-close-button", // Add custom class for the close button
                                },
                              });
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        ),
                      }}
                    />

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Offer (e.g., Flash Sale, 31% Off)"
                      value={newProduct.offer}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, offer: e.target.value })
                      }
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Stock Message (e.g., Hurry up! Only 2 left)"
                      value={newProduct.stockMessage}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          stockMessage: e.target.value,
                        })
                      }
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Select
                      fullWidth
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                      required
                      displayEmpty
                      variant="outlined"
                      renderValue={(selected) => {
                        if (!selected) return "Select Category";
                        const categoryMap = {
                          all: "All",
                          "mens-wear": "Men's Wear",
                          "womens-wear": "Women's Wear",
                        };
                        return categoryMap[selected] || selected;
                      }}
                    >
                      <MenuItem value="">Select Category</MenuItem>
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="mens-wear">Men's Wear</MenuItem>
                      <MenuItem value="womens-wear">Women's Wear</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      sx={{ fontWeight: "bold" }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : editingProduct ? (
                        "Update Product"
                      ) : (
                        "Add Product"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </>
        )}

        {selectedSection === "manage-products" && (
          <>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                textAlign: "center",
              }}
            >
              Manage Products
            </Typography>

            {/* Manage Products Table */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                width: "100%",
                maxWidth: "1000px",
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Category
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Offer</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Stock Message
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow
                        key={product._id}
                        sx={{ "&:hover": { backgroundColor: "action.hover" } }}
                      >
                        <TableCell>
                          <Avatar
                            src={product.image}
                            alt={product.name}
                            sx={{ width: 56, height: 56 }}
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>Rs. {product.price}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.offer}</TableCell>
                        <TableCell>
                          {getStockMessage(product)}{" "}
                          {/* Display stock message */}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              color="primary"
                              onClick={() => handleEdit(product)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(product._id)}
                            >
                              <Delete />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        )}

        {selectedSection === "orders" && (
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "center",
            }}
          >
            Orders
          </Typography>
        )}

        {selectedSection === "settings" && (
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "center",
            }}
          >
            Settings
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AdminPanel;
