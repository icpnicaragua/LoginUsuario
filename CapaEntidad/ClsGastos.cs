using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsGastos
    {
        private string _IdGasto;
        private string _Fecha;
        private string _Serie;
        private string _Documento;
        private string _Cantidad;
        private ClsTipoGasto _ObjTipoGasto;
        private string _Descripcion;
        private string _GastoCaja;
        private ClsEmpleado _ObjAutorizadopor;
        private string _Estado;
        private string _Hora;
        private ClsInicioCaja _ObjInicioCaja;

        public string IdGasto { get => _IdGasto; set => _IdGasto = value; }
        public string Fecha { get => _Fecha; set => _Fecha = value; }
        public string Serie { get => _Serie; set => _Serie = value; }
        public string Documento { get => _Documento; set => _Documento = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }
        public ClsTipoGasto ObjTipoGasto { get => _ObjTipoGasto; set => _ObjTipoGasto = value; }
        public string Descripcion { get => _Descripcion; set => _Descripcion = value; }
        public string GastoCaja { get => _GastoCaja; set => _GastoCaja = value; }
        public ClsEmpleado ObjAutorizadopor { get => _ObjAutorizadopor; set => _ObjAutorizadopor = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public string Hora { get => _Hora; set => _Hora = value; }

        public ClsInicioCaja ObjInicioCaja { get => _ObjInicioCaja; set => _ObjInicioCaja = value; }

        public ClsGastos()
        {
            this.ObjTipoGasto = new ClsTipoGasto();
            this.ObjAutorizadopor = new ClsEmpleado();
            this.ObjInicioCaja = new ClsInicioCaja();
        }
    }
}
