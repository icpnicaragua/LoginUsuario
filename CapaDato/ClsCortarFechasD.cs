using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDato
{
    internal class ClsCortarFechasD
    {
        public static string getFecha(string IString)
        {
            int espacio;
            espacio = IString.IndexOf(" ", 0)+1;
            return IString.Substring(0, espacio);

        }
    }
}
