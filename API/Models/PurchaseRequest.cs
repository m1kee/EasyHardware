using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class PurchaseRequest
    {
        public List<ShoppingCartItem> ShoppingCartItems { get; set; }
    }

    public class ShoppingCartItem
    {
        public Product Item { get; set; }
        public int Count { get; set; }
        public int Id { get; set; }
    }
}