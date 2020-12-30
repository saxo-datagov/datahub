package com.linkedin.common.urn;

import com.linkedin.common.FabricType;
import com.linkedin.data.template.Custom;
import com.linkedin.data.template.DirectCoercer;
import com.linkedin.data.template.TemplateOutputCastException;
import java.net.URISyntaxException;
import java.util.regex.Pattern;


public final class BusinessTermUrn extends Urn {

  public static final String ENTITY_TYPE = "businessTerm";

  private final String _name;
  private final String _domain;

  public BusinessTermUrn(String domain, String name) {
    super(ENTITY_TYPE, TupleKey.create(domain, name));
    this._name = name;
    this._domain = domain;
  }

  public String getNameEntity() {
    return _name;
  }

  public String getDomainEntity() {
    return _domain;
  }

  public static BusinessTermUrn createFromString(String rawUrn) throws URISyntaxException {
    return createFromUrn(Urn.createFromString(rawUrn));
  }

  public static BusinessTermUrn createFromUrn(Urn urn) throws URISyntaxException {
    if (!"li".equals(urn.getNamespace())) {
      throw new URISyntaxException(urn.toString(), "Urn namespace type should be 'li'.");
    } else if (!ENTITY_TYPE.equals(urn.getEntityType())) {
      throw new URISyntaxException(urn.toString(), "Urn entity type should be 'businessTerm'.");
    } else {
      TupleKey key = urn.getEntityKey();
      if (key.size() != 2) {
        throw new URISyntaxException(urn.toString(), "Invalid number of keys.");
      } else {
        try {
          return new BusinessTermUrn((String) key.getAs(0, String.class),
                  (String) key.getAs(1, String.class));
        } catch (Exception var3) {
          throw new URISyntaxException(urn.toString(), "Invalid URN Parameter: '" + var3.getMessage());
        }
      }
    }
  }

  public static BusinessTermUrn deserialize(String rawUrn) throws URISyntaxException {
    return createFromString(rawUrn);
  }

  static {
    Custom.registerCoercer(new DirectCoercer<BusinessTermUrn>() {
      public Object coerceInput(BusinessTermUrn object) throws ClassCastException {
        return object.toString();
      }

      public BusinessTermUrn coerceOutput(Object object) throws TemplateOutputCastException {
        try {
          return BusinessTermUrn.createFromString((String) object);
        } catch (URISyntaxException e) {
          throw new TemplateOutputCastException("Invalid URN syntax: " + e.getMessage(), e);
        }
      }
    }, BusinessTermUrn.class);
  }

}
