using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsElemento
    {
        private string _Id_elemento;
        private string _elemento;
        private string _fecha_inicioElemento;
        private ClsTipoControl _objTipo_control;
        private ClsVista _objVista;
        private string _idaspelemento;

        public string Id_elemento { get => _Id_elemento; set => _Id_elemento = value; }
        public string Elemento { get => _elemento; set => _elemento = value; }
        public string Fecha_inicioElemento { get => _fecha_inicioElemento; set => _fecha_inicioElemento = value; }
        public ClsTipoControl ObjTipo_control { get => _objTipo_control; set => _objTipo_control = value; }
        public ClsVista ObjVista { get => _objVista; set => _objVista = value; }
        public string Idaspelemento { get => _idaspelemento; set => _idaspelemento = value; }

        public ClsElemento()
        {
            this.ObjTipo_control = new ClsTipoControl();

            this.ObjVista = new ClsVista();

        }
    }
}
