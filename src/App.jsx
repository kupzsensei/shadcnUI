import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProductAPI, deleteProductAPI, editProductAPI, getAllProductsAPI } from "./api";
import { useRef, useState } from "react";
function App() {
  const queryClient = useQueryClient();
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductsAPI,
  });

  const [editID, setEditID] = useState(null);

  const addProductMutation = useMutation({
    mutationFn: addProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setEditID(null);
      setProductDialog(false);
    },
    onError: (data) => console.log(data),
  });

  const editProductMutation = useMutation({
    mutationFn: editProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setEditID(null);
      setProductDialog(false);
    },
    onError: (data) => console.log(data),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const [productDialog, setProductDialog] = useState(false);

  const productNameRef = useRef(null);
  const productDescriptionRef = useRef(null);
  const productPriceRef = useRef(null);
  const productImageLinkRef = useRef(null);

  const handleAdd = () => {
    let postData = {
      name: productNameRef.current.value,
      description: productDescriptionRef.current.value,
      price: parseFloat(productPriceRef.current.value),
      image_src: productImageLinkRef.current.value,
    };
    if (editID) {
      postData = { ...postData, id: editID };
      editProductMutation.mutate(postData)
    } else {
      console.log(postData);
      addProductMutation.mutate(postData);
    }
  };

  return (
    <SidebarProvider>
      <main className=" w-screen h-screen flex">
        <AppSidebar />
        <section className="flex flex-col gap-5">
          <SidebarTrigger />
          <Dialog open={productDialog} onOpenChange={setProductDialog}>
            <DialogTrigger>Add Product</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>
                  adding products will cost you your life.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                <Input
                  type="text"
                  placeholder="Product Name"
                  ref={productNameRef}
                />
                <Input
                  type="text"
                  placeholder="Product Description"
                  ref={productDescriptionRef}
                />
                <Input
                  type="text"
                  placeholder="Product Price"
                  ref={productPriceRef}
                />
                <Input
                  type="text"
                  placeholder="Product Image link"
                  ref={productImageLinkRef}
                />
                <Button onClick={handleAdd}>Submit</Button>
              </div>
            </DialogContent>
          </Dialog>
          <div className="flex-1 min-h-0 flex gap-4 flex-wrap justify-center">
            {products?.map((obj) => (
              <Card key={obj.id} className="h-min">
                <CardHeader>
                  <CardTitle>{obj.name}</CardTitle>
                  <CardDescription>{obj.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    className="w-[250px] h-[200px]"
                    src={
                      obj.image_src
                        ? obj.image_src
                        : "https://cdn.britannica.com/80/257780-050-83625D16/Converse-Rubber-Shoe-Company-Advertisement-non-skid-basketball-shoes-1920.jpg?w=400&h=225&c=crop"
                    }
                    alt="image"
                  />
                </CardContent>
                <CardFooter>
                  <h1>Price : {obj.price}</h1>
                  <div className="flex gap-4 px-3">
                    <Button
                      onClick={() => {
                        setProductDialog(true);
                        setEditID(obj.id);
                        setTimeout(() => {
                          productNameRef.current.value = obj.name;
                          productDescriptionRef.current.value = obj.description;
                          productPriceRef.current.value = obj.price;
                          productImageLinkRef.current.value = obj.image_src;
                        }, 300);
                      }}
                    >
                      edit
                    </Button>
                    <Button
                      onClick={() => {
                        deleteProductMutation.mutate({ id: obj.id });
                      }}
                    >
                      delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </SidebarProvider>
  );
}

export default App;
