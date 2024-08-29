import { Order } from "@/interfaces/order";
import { NewProduct } from "@/lib/validators";

// cambiar por getProducts
export async function getMenu(){
  try {
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:L_ZjFp2S/product', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch inventory',
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  }
  catch (error) {
    if (error instanceof Error) {
      console.error('Failed', error.message);
      return {
        success: false,
        error: error.message || 'Failed to fetch inventory',
      };
    } else {
      console.error('An unknown error occurred');
      return {
        success: false,
        error: 'An unknown error occurred',
      };
    }
  }
}

export async function getProductById(id: string){
  try {
    const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:L_ZjFp2S/product/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch product',
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  }
  catch (error) {
    if (error instanceof Error) {
      console.error('Failed', error.message);
      return {
        success: false,
        error: error.message || 'Failed to fetch product',
      };
    } else {
      console.error('An unknown error occurred');
      return {
        success: false,
        error: 'An unknown error occurred',
      };
    }
  }
}

export async function getOrders(){
  try {
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:K09c96PL/order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch inventory',
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  }
  catch (error) {
    if (error instanceof Error) {
      console.error('Failed', error.message);
      return {
        success: false,
        error: error.message || 'Failed to fetch inventory',
      };
    } else {
      console.error('An unknown error occurred');
      return {
        success: false,
        error: 'An unknown error occurred',
      };
    }
  }
}

export async function postOrder(values: Order) {
  try {
    const res = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:K09c96PL/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch order',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data,
    };
  }
  catch (error) {
    if (error instanceof Error) {
      console.error('Failed', error.message);
      return {
        success: false,
        error: error.message || 'Failed to fetch inventory',
      };
    } else {
      console.error('An unknown error occurred');
      return {
        success: false,
        error: 'An unknown error occurred',
      };
    }
  }
}

export async function postProduct(values: NewProduct) {
  try {
    const res = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:L_ZjFp2S/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch product',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data,
    };
  }
  catch (error) {
    if (error instanceof Error) {
      console.error('Failed', error.message);
      return {
        success: false,
        error: error.message || 'Failed to fetch inventory',
      };
    } else {
      console.error('An unknown error occurred');
      return {
        success: false,
        error: 'An unknown error occurred',
      };
    }
  }
}

export async function deleteProductById(id: string){
  try {
    const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:L_ZjFp2S/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch inventory',
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  }
  catch (error) {
    if (error instanceof Error) {
      console.error('Failed', error.message);
      return {
        success: false,
        error: error.message || 'Failed to fetch inventory',
      };
    } else {
      console.error('An unknown error occurred');
      return {
        success: false,
        error: 'An unknown error occurred',
      };
    }
  }
}

export async function patchProduct(values: NewProduct, id: string) {
  try {
    const res = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:L_ZjFp2S/product/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch inventory',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data,
    };
  }
  catch (error) {
    if (error instanceof Error) {
      console.error('Failed', error.message);
      return {
        success: false,
        error: error.message || 'Failed to fetch inventory',
      };
    } else {
      console.error('An unknown error occurred');
      return {
        success: false,
        error: 'An unknown error occurred',
      };
    }
  }  
}

export async function newSales(values: any) {
  try {
    const res = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:g1DfzdXx/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch order',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data,
    };
  }
  catch (error) {
    if (error instanceof Error) {
      console.error('Failed', error.message);
      return {
        success: false,
        error: error.message || 'Failed to fetch inventory',
      };
    } else {
      console.error('An unknown error occurred');
      return {
        success: false,
        error: 'An unknown error occurred',
      };
    }
  }
}

export async function patchSales(values: any, sales_id: string) {
  {
    try {
      const res = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:g1DfzdXx/sales/${sales_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          error: errorData.message || 'Failed to fetch inventory',
        };
      }
  
      const data = await res.json();
      return {
        success: true,
        data,
      };
    }
    catch (error) {
      if (error instanceof Error) {
        console.error('Failed', error.message);
        return {
          success: false,
          error: error.message || 'Failed to fetch inventory',
        };
      } else {
        console.error('An unknown error occurred');
        return {
          success: false,
          error: 'An unknown error occurred',
        };
      }
    }  
  }
}

export async function getSalesByDate(values: any){
  try {
    const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:g1DfzdXx/date_now`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch product',
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  }
  catch (error) {
    if (error instanceof Error) {
      console.error('Failed', error.message);
      return {
        success: false,
        error: error.message || 'Failed to fetch product',
      };
    } else {
      console.error('An unknown error occurred');
      return {
        success: false,
        error: 'An unknown error occurred',
      };
    }
  }
}