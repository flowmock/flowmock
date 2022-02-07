using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace FlowMock.Engine.Models.Rules
{
    public class NameOpValueEvaluator
    {
        public bool Evaluate(string compareValue, string op, string compareTo)
        {
            if (op == "equals" && compareValue == compareTo)
            {
                return true;
            }
            else if (op == "contains" && compareValue.Contains(compareTo))
            {
                return true;
            }
            else if (op == "startsWith" && compareValue.StartsWith(compareTo))
            {
                return true;
            }
            else if (op == "endsWith" && compareValue.EndsWith(compareTo))
            {
                return true;
            }
            else if (op == "regex" && new Regex(compareTo).IsMatch(compareValue))
            {
                return true;
            }

            return false;
        }
    }
}
