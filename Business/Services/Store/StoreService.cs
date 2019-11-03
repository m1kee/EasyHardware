using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Business.Services
{
    public class StoreService : IStoreService
    {
        public IList<Store> Get(EasyHardwareEntities context)
        {
            return context.Store.Where(x => x.Active)
                                  .ToList();
        }
        public Store Get(EasyHardwareEntities context, int storeId)
        {
            // get the attached store 
            return context.Store.SingleOrDefault(x => x.Id == storeId);
        }
        public Store Get(EasyHardwareEntities context, string storeCode)
        {
            // get the attached store 
            return context.Store.SingleOrDefault(x => x.Code == storeCode);
        }
        public Store Add(EasyHardwareEntities context, Store store)
        {
            // add store to context
            context.Store.Add(store);
            // save changes
            context.SaveChanges();
            return store;
        }
        public Store Edit(EasyHardwareEntities context, int storeId, Store store)
        {
            // get the attached store 
            Store dbStore = context.Store.Single(x => x.Id == storeId);
            // edit values
            dbStore.Active = store.Active;
            dbStore.Description = store.Description;
            dbStore.Name = store.Name;
            dbStore.Location = store.Location;
            // save changes after edit
            context.SaveChanges();
            // return edited store
            return store;
        }
        public Store Delete(EasyHardwareEntities context, int storeId)
        {
            // get the attached store 
            Store store = context.Store.Single(x => x.Id == storeId);
            // soft delete
            store.Active = false;
            // save changes after soft delete
            context.SaveChanges();
            // returns deleted store
            return store;
        }
    }
}
