import { useState } from "react";
import {
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Container,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";

import "./App.css";
import DATA from "./data.json";

const numberFormat = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

function App() {
  const [products, setProducts] = useState(DATA.products);

  const onCategoryClicked = (id) => {
    setProducts(
      DATA.products.filter((product) => product.categories.includes(id))
    );
  };

  const showAllProducts = () => {
    setProducts(DATA.products);
  };

  const showAvailableProducts = () => {
    setProducts(DATA.products.filter((product) => product.available));
  };

  const showSoldOutProducts = () => {
    setProducts(DATA.products.filter((product) => !product.available));
  };

  const showBestSellerProducts = () => {
    setProducts(DATA.products.filter((product) => product.best_seller));
  };

  const showFrom30K = () => {
    setProducts(DATA.products.filter((product) => product.price >= 30000));
  };

  const showUpto10K = () => {
    setProducts(DATA.products.filter((product) => product.price <= 10000));
  };

  const sortByName = () => {
    setProducts([
      ...DATA.products.sort((a, b) => a.name.localeCompare(b.name)),
    ]);
  };

  const sortHighToLow = () => {
    setProducts([
      ...DATA.products.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      ),
    ]);
  };

  const sortLowToHigh = () => {
    setProducts([
      ...DATA.products.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      ),
    ]);
  };

  return (
    <div className="App">
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" edge="start" sx={{ mr: 2 }}>
            Store
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Button sx={{ color: "#fff" }} onClick={() => showAllProducts()}>
              All
            </Button>
            {DATA.categories.map((category) => (
              <Button
                sx={{ color: "#fff" }}
                onClick={() => onCategoryClicked(category.category_id)}
              >
                {category.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Button onClick={() => showAvailableProducts()}>Available</Button>
          <Button onClick={() => showSoldOutProducts()}>Sold out</Button>
          <Button onClick={() => showBestSellerProducts()}>Best seller</Button>
          <Button onClick={() => showFrom30K()}>From 30.000</Button>
          <Button onClick={() => showUpto10K()}>Up to 10.000</Button>
          <Button onClick={() => sortByName()}>Sort by name</Button>
          <Button onClick={() => sortHighToLow()}>Sort by: High to Low</Button>
          <Button onClick={() => sortLowToHigh()}>Sort by: Low to High</Button>
        </Grid>

        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.img}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="subtitle2" color="text.primary">
                    {numberFormat.format(product.price)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Agregar al carrito</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
